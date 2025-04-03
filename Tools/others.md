### Redis

- If you got `WRONGTYPE Operation against a key holding the wrong kind of value` while trying to `GET` a key, double check the key using `TYPE` to see if its a string or hash because if its not a string, the error would occur when doing `GET key`.

### Wordpress

- Wordpress (and maybe other CMS apps) save the URLs in the database, so in case you wanted to migrate the app and use a new domain, the URLs in the database will need to be changed.

## Windows

### Powershell

- A quick [reference](https://www.ninjaone.com/blog/windows-powershell-commands-cheat-sheet/).
- Ultimate [cheat sheet](https://github.com/ab14jain/PowerShell).
    - Take note on how the [functions](https://github.com/ab14jain/PowerShell?tab=readme-ov-file#8-functions) are structured.
- List of commands and scripting [cheat sheet](https://gist.github.com/pcgeek86/336e08d1a09e3dd1a8f0a30a9fe61c8a).

### Utilities

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