##Tic Tac Toe

And you will never win, try [here](http://liuwenchao.github.com/tic-tac-toe)

###Production: Steps to deploy on EC2
1. Log into Amazon console
1. Click EC2 Item.
1. Select "Launch Instance"
1. Pick "Ubuntu Server 14.04 LTS (PV), SSD Volume Type - ami-d85e75b0"
1. Select a "Micro instances"
1. Generate and download a new key pair.
1. Launch Instance.
1. Following [Here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) to connect via SSH
1. after login, run

  ```
  sudo apt-get update
  sudo apt-get upgrade
  sudo apt-get install git git-core nginx
  ssh-keygen
  cat .ssh/id_rsa
  # in https://github.com/settings/ssh, add content of id_rsa as a SSH key.
  git clone https://github.com/liuwenchao/tic-tac-toe
  sudo vi /etc/nginx/sites-available/default
  # change root to /home/ubuntu/tic-tac-toe
  ```

1. in EC2 instance list, select the instance, click Actions -> Networking -> Change Security Groups
1. check the default group, and click 'Assign Security Groups', to enable inbound traffic to 80 port.
1. verify the site is available through new site: http://ec2-52-7-172-43.compute-1.amazonaws.com/


### Development: How to run local with node.js
1. [install node.js npm http-server](https://www.npmjs.com/package/http-server)
2. run `http-server .`
3. visit http://localhost:8080
