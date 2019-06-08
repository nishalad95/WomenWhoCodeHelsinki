# Environment Set Up

## Prerequisites

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


### OCI Environment Setup

Click [here](mimmitkoodaa.pdf) to view how to setup your environment.

### Dockerhub account
- Set up a [Dockerhub](https://hub.docker.com/signup) account

### Connect to a pre-created user account with all requirements installed

You have gone through the process of setting up your own OCI account and set up the infrastructure required to play around with containers, however we will also need to expose them to the outside world, which requires a little bit more setup on the Oracle Clould Infrastructure. However, to keep it simple, we pre-generated some user accounts for all of you that have everything set up to expose our apps to the Public Internet.

Your workshop instructor will provide you with the following:

1. **Workshop Participant Number**--a unique number that will be incorporated
   into your user id
2. OCI **Tenancy Name**--that you will use to log into an OCI cloud account
   (it's "**cloudnative-devrel**"!)
3. OCI **User Id/Password**--to enable you to log into the OCI Console and to
   deploy functions
4. **IP Address**--of your hosted development environment virtual machine
5. **VNC Password**--to allow you to log into your hosted development virual
   machine (it's "**workshop**"!)

Before we get started you'll need to log into the OCI account you've been
provided to change your password from the temporary initial password.

![user input](../../InstructorNotes/Images/setup/userinput.png) Log into the OCI console in *Ashburn*
specifying the "**cloudnative-devrel**" tenancy.  

https://console.us-ashburn-1.oraclecloud.com

![Login Tenancy](../../InstructorNotes/Images/setup/login.png)

![user input](../../InstructorNotes/Images/setup/userinput.png) Provide your OCI username along with the
initial password you were provided.  

![Login User](../../InstructorNotes/Images/setup/login-user.png)

![user input](../../InstructorNotes/Images/setup/userinput.png) Provide a new password satisfying the
requirements and note it down.

![Login New Password](../../InstructorNotes/Images/setup/login-new-password.png)

## Configuring your Environment

Now that your user account is accessible, let's log into the provided VM.

To access your cloud-based development environment you'll need a VNC client
on your laptop. 

Install VNCViewer for your own operating system from: https://www.realvnc.com/en/connect/download/viewer/
 
Or you can use the VNC Viewer for Chrome that is extremely easy to install through the
Chrome Web Store (but it's buggier):

https://chrome.google.com/webstore/detail/vnc%C2%AE-viewer-for-google-ch/iabmpiboiopbgfabjmgeedhcmjenhbla/related


![user input](../../InstructorNotes/Images/setup/userinput.png) Log into your VM using the provided IP
Address and password.  The VNC port is "**5903**" so the server address you'll need
to provide will look like `n.n.n.n:5903`

Enter the provided VNC password "**workshop**" to complete your login.

![vnc login](../../InstructorNotes/Images/setup/vnc-login.png)

## All Set!

Let's get started with our first tutorial [here](BusyboxDemo.md)! 
