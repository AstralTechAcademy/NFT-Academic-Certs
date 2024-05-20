FROM node:20
RUN apt update -y && apt install nano sudo systemctl -y
RUN useradd -G sudo -m avalanche
RUN echo avalanche:avalanche | chpasswd
WORKDIR /avalanche

# Avalanche CLI is a tool to simulate a network of 5 nodes. In this network we can create custom subnet for testing purpose
# After test in local network we can deploy the subnet to the Fuji testnet and connect our wallets to it
COPY install.sh .
RUN chown avalanche:avalanche *.sh && chmod 755 *.sh
RUN chown avalanche:avalanche /avalanche
USER avalanche
WORKDIR /home/avalanche
COPY .avalanche-cli.json .
WORKDIR /avalanche
RUN ./install.sh v1.3.2
RUN echo "export PATH=~/bin:$PATH" >> /home/avalanche/.bashrc
RUN echo "alias deploy=\"avalanche subnet deploy spain\"" >> /home/avalanche/.bashrc
RUN echo "alias ava=\"avalanche\"" >> /home/avalanche/.bashrc
RUN echo "alias avan=\"avalanche network\"" >> /home/avalanche/.bashrc
RUN echo "alias avas=\"avalanche subnet\"" >> /home/avalanche/.bashrc
RUN echo "alias pbu=\"cd /home/avalanche/citizenchain/src/\"" >> /home/avalanche/.bashrc
RUN echo "alias deploy=\"yarn deploy\"" >> /home/avalanche/.bashrc
RUN echo "alias main=\"yarn main\"" >> /home/avalanche/.bashrc
WORKDIR /home/avalanche
USER root
RUN chown avalanche:avalanche -R /home/avalanche/

USER avalanche
RUN mkdir /home/avalanche/nft_academic && mkdir /home/avalanche/nft_academic/src
CMD bash