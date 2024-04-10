param (
    [string]$message,
    [string]$branch
)

function Push-GitChanges {
    param (
        [string]$commitMessage,
        [string]$targetBranch
    )

    git add .
    git commit -m $commitMessage
    git push origin $targetBranch
}

Push-GitChanges -commitMessage $message -targetBranch $branch
