# Agent Tasks API Documentation

## Overview

The AVTasks app now supports displaying AI agent tasks in addition to user-created tasks. The agent tasks are stored in a JSON file and automatically refreshed every 10 seconds in the app.

## File Location

**Production:** `/home/molt/openclaw/hassan/projects/avtasks/public/agent-tasks.json`

This file is deployed to: `https://smetools.github.io/avtasks/agent-tasks.json`

## JSON Format

```json
[
  {
    "id": 1,
    "description": "Task description here",
    "status": "pending | in-progress | done",
    "createdAt": "2026-02-06T12:43:54.756384"
  }
]
```

### Fields

- **id** (number): Unique identifier for the task
- **description** (string): What the task is about
- **status** (string): One of `"pending"`, `"in-progress"`, or `"done"`
- **createdAt** (string): ISO 8601 timestamp when task was created

## Helper Script

Use the Python helper script to manage agent tasks:

```bash
# Location
/home/molt/openclaw/hassan/scripts/update_agent_tasks.py

# List all tasks
python3 update_agent_tasks.py list

# Add a new task (default status: pending)
python3 update_agent_tasks.py add "Task description"

# Add a task with specific status
python3 update_agent_tasks.py add "Fix the database" "in-progress"

# Update task status
python3 update_agent_tasks.py update 1 "done"

# Remove a task
python3 update_agent_tasks.py remove 1

# Clear all tasks
python3 update_agent_tasks.py clear
```

## Usage from Main Agent

### Adding a task when starting work

```python
import subprocess

def start_agent_task(description):
    subprocess.run([
        'python3',
        '/home/molt/openclaw/hassan/scripts/update_agent_tasks.py',
        'add',
        description,
        'in-progress'
    ])
```

### Updating task status

```python
def complete_agent_task(task_id):
    subprocess.run([
        'python3',
        '/home/molt/openclaw/hassan/scripts/update_agent_tasks.py',
        'update',
        str(task_id),
        'done'
    ])
```

### Example workflow

```python
# When starting a task
exec: python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py add "Deploy new feature" "in-progress"

# During work, user can see it in the app with 🤖 icon and pulsing status

# When complete
exec: python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py update 1 "done"

# Or remove it entirely
exec: python3 /home/molt/openclaw/hassan/scripts/update_agent_tasks.py remove 1
```

## Deployment

After updating agent-tasks.json:

```bash
cd /home/molt/openclaw/hassan/projects/avtasks
npm run deploy
```

This rebuilds the PWA and pushes to GitHub Pages, making the updated tasks visible within ~10 seconds.

## UI Features

### Agent Tasks Section

- **Icon:** 🤖 Robot face
- **Badge:** Shows count of pending/in-progress tasks
- **Collapsible:** Click +/− to expand/collapse
- **Auto-refresh:** Updates every 10 seconds
- **Status indicators:**
  - ○ Pending (gray circle)
  - ⏳ In Progress (orange, pulsing)
  - ✓ Done (green checkmark)
- **Timestamps:** Shows relative time (e.g., "5m ago", "2h ago")

### Visual Design

- Agent tasks have purple left border
- In-progress tasks have orange accent and pulsing animation
- Done tasks are semi-transparent
- Separate from user tasks for clarity

## Example Use Cases

1. **Long-running deployments**
   ```bash
   python3 update_agent_tasks.py add "Deploying to production" "in-progress"
   # ... deployment happens ...
   python3 update_agent_tasks.py update 1 "done"
   ```

2. **Background research**
   ```bash
   python3 update_agent_tasks.py add "Researching React Native performance" "in-progress"
   ```

3. **Multi-step processes**
   ```bash
   python3 update_agent_tasks.py add "Step 1: Building Docker image" "in-progress"
   python3 update_agent_tasks.py add "Step 2: Running tests" "pending"
   python3 update_agent_tasks.py add "Step 3: Deploying to staging" "pending"
   ```

## Direct File Editing (Alternative)

If you prefer to edit the JSON file directly:

```bash
# Edit
nano /home/molt/openclaw/hassan/projects/avtasks/public/agent-tasks.json

# Deploy
cd /home/molt/openclaw/hassan/projects/avtasks && npm run deploy
```

Keep the JSON valid and follow the schema above.

## Monitoring

Hassan can open https://smetools.github.io/avtasks/ on any device and see:
- His personal tasks (local storage)
- Your agent tasks (synced from server)

Both sections update in real-time.
