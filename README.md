# Coding1st

## Author

Carlos Santana <carlos@milkzoft.com>

## Setup Instructions

1. Install the latest version of Docker (<https://www.docker.com/>).

2. Install the latest version of VirtualBox (<https://www.virtualbox.org/>).

3. Install the latest version of Node.js (<https://www.nodejs.org/>).

4. Create a new Docker Machine (dev).

    `docker-machine create --driver virtualbox dev`
  
5. Execute the follow command to switch to the new dev docker machine:

    `eval "$(docker-machine env dev)"`

6. Execute the follow command and copy the information to your .bash_profile:

    `docker-machine env dev`

    This will return something like (copy & paste this information to your .bash_profile):

    `export DOCKER_TLS_VERIFY="1"
     export DOCKER_HOST="tcp://192.168.99.100:2376"
     export DOCKER_CERT_PATH="/Users/czantany/.docker/machine/machines/default"
     export DOCKER_MACHINE_NAME="default"`

7. Clone the repository under you projects folder (be sure you are on "develop" branch).

    `git clone git@github.com:MilkZoft/coding1st.git`

8. Install global dependencies:

    `npm install -g gulp bower stylus

9. Execute the follow gulp command:

    `gulp docker-build`

    This will ask you the name of the image (Type Docker Image Name:), type: `coding1st` (this process can take 10 or 15 minutes).

10. Install local dependencies:
  
    `npm install`

11. Execute `bower install` to get all the components.

12. Execute the follow gulp command:

    `gulp docker-run`

    This will ask you the host port (type `9999`), and then will ask you for the Docker Image that you created before (type `coding1st`).

13. Update your hosts file(s). Add the following lines to the bottom of `/etc/hosts` AND `/etc/hosts.ac` (if hosts.ac exists on your machine):

    `127.0.0.1 local.coding1st.com`
    `192.168.99.100 docker.me (this IP is the DOCKER_HOST)

14. Include the proxy file into the `/etc/apache2/extra/httpd-vhosts.conf` file then restart Apache service.

    `Include /Users/<username>/projects/coding1st/001-coding1st-proxy.conf`

15. Restart apache.

    `sudo apachectl restart`

16. Run the site at (<http://local.coding1st.com>).

## Troubleshooting

If you cannot hit the website, try to open http://docker.me:9999 or see the docker logs to see if you have some error: `docker logs coding1st-container
