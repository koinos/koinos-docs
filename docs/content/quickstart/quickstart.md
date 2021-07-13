# Getting started

## Running a Koinos node


The Koinos engineering team came up with an elegant and clean install-and-run path which makes it super easy for almost anyone to run a node. The most time consuming part would be installing Docker, after that its just a matter of cloning the repo and running a command in the terminal (an extra step is required for Windows users). 
<br/>

### Installing on OSX / Linux

1. Download and install [Docker](https://www.docker.com/products/docker-desktop)
2. Clone (or download) the Koinos repository from [github](http://github.com/koinos/koinos)
3. Open the terminal in the downloaded directory and run the following command:

    ```
    docker-compose up
    ```
<br/>

### Installing on Windows

1. Download and install Docker
2. Clone (or download) the Koinos repository from [github](http://github.com/koinos/koinos)
3. Edit the first line in the .env file to read:

    ```
    BASERID=c:\koinos
    ```

4. Open the terminal in the downloaded directory and run the following command:

    ```
    docker-compose up
    ```


<br/>
<hr/>
<br/>

&nbsp;


<a href="http://www.youtube.com/watch?feature=player_embedded&v=64NWplpcmqU
" target="_blank"><img src="http://img.youtube.com/vi/64NWplpcmqU/0.jpg" 
alt="Install a koinos node video"  border="1" /></a>