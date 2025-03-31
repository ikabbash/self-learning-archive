# Jenkins
- To make a server work as an agent node for your Jenkins master you’ll need to download the agent/slave jar file from your Jenkins server itself using `wget http://<JENKINS_URL>/jnlpJars/agent.jar` (or `slave.jar`)
    - Make sure the agent server has compatible JDK installed
- `kill ps aux | grep -i jenkins | grep -i jar | awk '{print $2}'` is handy in case you need to restart Jenkins agent to refresh environment variables its reading from a file