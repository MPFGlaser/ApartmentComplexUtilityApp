# Get a list of affected apps
affected_apps=$(npx nx show projects affected --with-target serve --base=origin/main..HEAD)

for app in $affected_apps
do
  # Check if the version file in the app's directory has changed
  version_file_change=$(git diff origin/main..HEAD --quiet -- "helm/$app/Chart.yaml" || echo "changed")

  if [ "$version_file_change" != "changed" ]
  then
    echo "Version of $app has not been bumped yet!"
    exit 1
  fi
done
