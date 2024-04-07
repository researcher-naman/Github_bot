import discord
import requests
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} ({bot.user.id})')

@bot.command()
async def commit(ctx, message):
    # Replace 'YOUR_GITHUB_TOKEN' with your GitHub personal access token
    github_token = 'YOUR_GITHUB_TOKEN'
    repo_owner = 'your_username'
    repo_name = 'your_repo_name'
    file_path = 'path/to/your/file.txt'

    # GitHub API endpoint to create a commit
    api_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{file_path}'

    # Prepare data for the commit
    commit_data = {
        "message": f"Commit from Discord: {message}",
        "content": "base64_encoded_content",  # Replace with your base64-encoded content
        "branch": "main"  # Replace with your branch name
    }

    # GitHub API headers with authentication
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }

    # Make the API request to create a commit
    response = requests.put(api_url, json=commit_data, headers=headers)

    if response.status_code == 201:
        await ctx.send(f'Commit successful! Message: {message}')
    else:
        await ctx.send(f'Commit failed. Status code: {response.status_code}')

# Replace 'YOUR_BOT_TOKEN' with your Discord bot token
bot.run('YOUR_BOT_TOKEN')
