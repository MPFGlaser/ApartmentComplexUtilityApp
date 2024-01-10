import { MessageTopic, auth, getTopic } from '@acua/microservice-shared';
import { UserClaim } from '../enums/UserClaim.enum';
import { UserRecord } from 'firebase-admin/lib/auth';

class UserService {
  public async getAllUsers() {
    const listAllUsers = async (nextPageToken?): Promise<UserRecord[]> => {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      let users = listUsersResult.users;

      if (listUsersResult.pageToken) {
        users = users.concat(await listAllUsers(listUsersResult.pageToken));
      }

      return users;
    };

    const allUsers = await listAllUsers();

    // keep only relevant, non-sensitive data
    const allUsersSanitised = allUsers.map((user) => ({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      disabled: user.disabled,
      metadata: user.metadata,
      providerData: user.providerData,
      customClaims: user.customClaims,
    }));

    return allUsersSanitised;
  }

  public async getPrivilegedUsers() {
    // get all users with custom claims set, max 1000 users
    const users = await this.getAllUsers();

    // filter out users without custom claims
    const privilegedUsers = users.filter((user) => user.customClaims);

    return privilegedUsers;
  }

  public async grantClaims(target: string, claimsToGrant: UserClaim[]) {
    const targetUser = await auth.getUser(target);

    if (!targetUser) throw new Error('User not found');

    const currentClaims = targetUser.customClaims || {};

    const newClaims = {
      ...currentClaims,
      ...claimsToGrant.reduce((acc, claim) => ({ ...acc, [claim]: true }), {}),
    };

    await auth.setCustomUserClaims(target, newClaims);
  }

  public async revokeClaims(
    target: string,
    claimsToRevoke: Array<UserClaim | '*'>
  ) {
    const targetUser = await auth.getUser(target);

    if (!targetUser) throw new Error('User not found');

    if (claimsToRevoke.includes('*')) {
      await auth.setCustomUserClaims(target, null);
    } else {
      const userClaims = targetUser.customClaims || {};
      claimsToRevoke.forEach((claim: string) => {
        delete userClaims[claim];
      });
      await auth.setCustomUserClaims(target, userClaims);
    }
  }

  public async handleDeleteUserDataRequest(target: string) {
    try {
      const topic = await getTopic(MessageTopic.DeleteUserData);

      topic.publishMessage({ data: Buffer.from(target) });
      console.log(`Message ${target} published.`);
    } catch (error) {
      console.error(error);
    }
  }

  // This is a separate function, to make sure that the message is actually sent out before the user is deleted.
  public async handleDeleteUserDataResponse(target: string) {
    try {
      await auth.deleteUser(target);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserService();
