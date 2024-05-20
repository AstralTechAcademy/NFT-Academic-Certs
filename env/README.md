### Docker runtime environment config
{
    "fixed-cidr-v6": "fd00::/80",
    "ipv6": true
}

### Build image
docker build -t techforum:1.2 .

### Run container
docker run -v <target_source_code_folder>:<container_source_code_folder> -p 9650:9650 -p 9651:9651 -it techforum:1.2