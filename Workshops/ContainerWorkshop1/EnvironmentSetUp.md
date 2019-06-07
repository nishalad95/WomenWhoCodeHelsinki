# Environment Set Up

## Prerequisites

### VNC installation

### SSH KeyGen

##### Create an SSH key pair for Windows

Windows devices will need an SSH client with keys generated, preferably using `Putty` and `PuttyGen` (comes bundled with Putty).

The following sections describe two options to create an SSH key pair on Windows. You can use a shell command (ssh-keygen) or a GUI tool (PuTTYgen).


##### Create SSH keys with PuTTYgen


If you prefer to use a GUI-based tool to create SSH keys, you can use the `PuTTYgen` key generator, included with the `PuTTY` download package. To create an SSH RSA key pair with PuTTYgen:

Download Putty on your desktop. The download comes bundled with all tooling.

https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

1. Start `PuTTYgen`.

2. Click Generate. By default `PuTTYgen` generates a 2048-bit SSH-2 RSA key.

3. Move the mouse around in the blank area to provide randomness for the key.

4. After the public key is generated, optionally enter and confirm a passphrase. You will be prompted for the passphrase when you authenticate to the VM with your private SSH key. Without a passphrase, if someone obtains your private key, they can sign in to any VM or service that uses that key. We recommend you create a passphrase. However, if you forget the passphrase, there is no way to recover it. The public key is displayed at the top of the window. You can copy this entire public key and then paste it into a file to save it, and later we can use this for the OCI portal or a Terraform template when you create a Linux VM. You should also select Save public key to save a copy to your computer.


##### Create SSH keys with ssh-keygen

If you run a command shell on Windows that supports SSH client tools, create an SSH key pair using the following ssh-keygen command. Type the following command, and answer the prompts. If an SSH key pair exists in the chosen location, those files are overwritten.

```bash
ssh-keygen -t rsa -b 2048
```

For more background and information, see the quick (https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys) or detailed (https://docs.microsoft.com/en-us/azure/virtual-machines/linux/create-ssh-keys-detailed) steps to create SSH keys using ssh-keygen.

### Dockerhub account
- Set up a [Dockerhub](https://hub.docker.com/) account



Let's get started with our first tutorial [here](BusyboxDemo.md)! 