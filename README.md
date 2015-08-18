# Atenção

Por enquanto, este repositório é praticamente uma cópia do http://github.com/tonylampada/djangular3
Depois com o tempo cada projeto segue seu rumo.
A pasta docs contém outros documentos importantes.

# Djangular 3

Django + AngularJS, pronto pra usar. Instruções abaixo.

# Setup do sistema operacional

Vc vai precisar instalar algumas coisas no seu sistema operacoinal pra que tudo funcione direitinho. É bem possível que algumas dessas coisas vc já tenha instalado. Só precisa fazer isso uma vez na vida.

* 1) Instala esse monte coisa aí com o apt-get (node, npm, o postgres e umas bibliotecas aih)

```bash
sudo apt-get install python3-dev node npm postgresql-9.3 postgresql-server-dev-all
```

* 2) Instala o gulp

```shell
sudo npm install -g gulp
```

* 3) Certifique-se que vc tem o python3 (meu ubuntu já veio com o python 2 e o 3, sendo que o 2 é o default)

* 4) Instale o virtualenvwrapper, de acordo com as instruções que tem no site (TODO)

# Setup do projeto

Agora vc precisa fazer o setup do projeto. Isso significa que se vc tivesse outro projeto desse, ia ter que fazer essas coisas de novo.

* 1) Cria o banco de dados e o usuario no postgres

```bash
sudo su postgres  #
createuser -d -SRP djangular3  # poe a senha djangular3
createdb -O djangular3 djangular3
exit  # Volta pro seu usuario

# Se vc quiser mudar o nome do banco/usuario/senha,
# tem que mexer no arquivo djangular3/settings.py
```

* 2) Cria o virtualenv do projeto e baixa as dependências do python

```shell
mkvirtualenv --python=/usr/bin/python3 djangular3  
# Renomeia esse djangular3 pro nome do seu projeto
deactivate  # So pra mostrar como sai do virtualenv
workon djangular3  # Entra no venv de novo
pip install -r requirements.txt
```

* 3) Cria as tabelas no banco

```shell
./manage.py migrate
```

* 4) Baixa as dependências pra build do frontend

```shell
cd frontend
npm install
```

* 5) Importa as funções do dev.sh pro seu bash

```shell
cd ..
. dev.sh  # Nao esquece desse pontinho ae
devhelp  # Esses comandos agora devem estar todos funcionando
#  Esse help aih eh a melhor parte. Ele vai te ajudar daqui pra frente.
#  Cuida dele pro seu projeto ficar sempre com os comandinhos atualizados!!
```