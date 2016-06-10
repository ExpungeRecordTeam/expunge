```
#!/bin/bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -f libxss1 libappindicator1 libindicator7 python python-pip
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

sudo dpkg -i google-chrome*.deb
sudo apt-get install -f xvfb
sudo apt-get install -f unzip

wget -N http://chromedriver.storage.googleapis.com/2.20/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
chmod +x chromedriver

sudo mv -f chromedriver /usr/local/share/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/bin/chromedriver

pip install pyvirtualdisplay selenium
```
