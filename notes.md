# Notes
This is my personal knowledge base containing notes, tips, and solutions I've collected from various scenarios, technical explorations and random stuff I don’t want to forget (and might help you, too).

## Table of Contents
- [Jenkins](#jenkins)
- [Sentry](#sentry)
- [Kuberentes Cert Manager](#kuberentes-cert-manager)
- [Redis](#redis)
- [Wordpress](#wordpress)
- [Powershell](#powershell)
- [Utilities](#utilities)
- [SSH Into Windows Server](#ssh-into-windows-server)

---

### Jenkins
- To make a server work as an agent node for your Jenkins master you’ll need to download the agent/slave jar file from your Jenkins server itself using `wget http://<JENKINS_URL>/jnlpJars/agent.jar` (or `slave.jar`).
    - Make sure the agent server has compatible JDK installed.
- `kill ps aux | grep -i jenkins | grep -i jar | awk '{print $2}'` is handy in case you need to restart Jenkins agent to refresh environment variables its reading from a file.

### Sentry
- To change [cleanup](https://github.com/getsentry/self-hosted/blob/f2e2dc2bb3c0c2505d0a6044989bdd29c7905fef/docker-compose.yml#L318-L326) schedule or check the number of days, check the following [article](https://forum.sentry.io/t/changing-sentry-event-retention-days-does-not-work/15313).
- You can change Sentry’s root URL by modifying the config yaml file and adding `system.url-prefix`, [reference](https://develop.sentry.dev/config/#general).
- In your Redis instance limit the memory usage and change max memory policy to its default one because Redis doesn’t release memory sometimes.
    
    ```yaml
    redis:
        <<: *restart_policy
        image: "redis:6.2.13-alpine"
    		# only add the line below
        command: ["/usr/local/bin/redis-server", "--maxmemory", "4092M", "--maxmemory-policy" ,"volatile-ttl"]
    ```
    
- In case the SMTP is not working and you want to invite someone and they can’t receive the invite link, use `docker exec` to get inside the Postgres container and access the database, retrieve the database the token using this query:
    
    ```sql
    SELECT id, email, token FROM sentry_organizationmember WHERE email = 'user-email@example.com';
    ```
    
    - Then construct the invite link like the following: `https://<your-sentry-domain>/accept/<user-id>/<token>/`.
- If you wanna change password for a user using CLI check [this](https://sentry.io/answers/how-to-reset-django-admin-password/).
- You can run `docker compose run --rm web createuser` to create a new user.
- SMTP settings can be updated in the `sentry/config.yml` file, after that execute the `install.sh` script again ([reference](https://develop.sentry.dev/self-hosted/email/)).

### Kuberentes Cert Manager
- When a virtual server is created, the cert manager creates a pod to do the ACME challenge for the SSL then creates the secret that contains the SSL certificate and key.
- If there’s basic authentication applied, certificate issuing or renewal most likely won’t succeed and result in acme challenges to fail with status code 401. You’ll need to add the following in virtual server as a server-snippet.
    
    ```bash
    location ^~ /.well-known/acme-challenge/ {
      auth_basic off;
    }
    ```
    
    - Debug or troubleshoot using `kubectl describe challenge` or inspect cert manager pod's logs.

---

### Redis
- If you got `WRONGTYPE Operation against a key holding the wrong kind of value` while trying to `GET` a key, double check the key using `TYPE` to see if its a string or hash because if its not a string, the error would occur when doing `GET key`.

### Wordpress
- Wordpress (and maybe other CMS apps) save the URLs in the database, so in case you wanted to migrate the app and use a new domain, the URLs in the database will need to be changed.

---

### Powershell
- A quick [reference](https://www.ninjaone.com/blog/windows-powershell-commands-cheat-sheet/).
- Ultimate [cheat sheet](https://github.com/ab14jain/PowerShell).
    - Take note on how the [functions](https://github.com/ab14jain/PowerShell?tab=readme-ov-file#8-functions) are structured.
- List of commands and scripting [cheat sheet](https://gist.github.com/pcgeek86/336e08d1a09e3dd1a8f0a30a9fe61c8a).

### Windows Utilities
- DxDiag (DirectX Diagnostics) is a tool from Microsoft included with DirectX to view a lot of system information and DirectX information (including the hardware manufacturer), can be useful for reconnaissance. Press Windows button + R and type dxdiag to run it or type it in a command prompt.

### SSH Into Windows Server
- Install and enable the OpenSSH service in Windows using Powershell, but make sure its not already existing first ([reference](https://www.hanselman.com/blog/how-to-ssh-into-a-windows-10-machine-from-linux-or-windows-or-anywhere)).
    
    ```bash
    Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
    Start-Service sshd
    Get-Service sshd
    Set-Service -Name sshd -StartupType 'Automatic'
    ```
    
- In order to be able to `ssh` into Windows passwordless, in your Linux server, copy the public key to the Windows server `scp id_rsa.pub USER@IP:%programdata%/ssh`
- Login into the Windows server using `ssh` and `cd %programdata%/ssh`.
- `type` command is like `cat` command in Linux, so append the key into the Windows authorized keys file `type id_rsa.pub >> administrators_authorized_keys`.
- Change the created file's permissions, F is for full control, and permission is given to Administrators and System only `icacls administrators_authorized_keys /inheritance:r /grant "Administrators:F" /grant "SYSTEM:F”`.
- Access the Windows server using RDP and open notepad as an administrator, go to `%programdata%/ssh` (type it in the file explorer search when you click on file then open in notepad) and make sure to reveal all files to select `sshd_config` to edit.
- Scroll down to `PubkeyAuthentication` and uncomment it.
- Uncomment `PasswordAuthentication` and `PermitEmptyPasswords` and turn them to no.
- Restart ssh service using the powershell `Restart-Service sshd` command.