#!/usr/bin/python
import multiprocessing
import sys
import random
import requests
import subprocess
import json
import time
import os
import socket
import signal
import tempfile

HostName=socket.gethostname()
NbProcess = multiprocessing.cpu_count()
UrlApi = os.getenv('URL_API', 'localhost')

def process(id):
    strId = "["+str(id)+"] : "
    print(strId, "begin")
    id_cluster = -1

    try:
        # On cree un dossier temporaire dans le dossier courant qui devient le dossier d'execution
        working_dir = tempfile.TemporaryDirectory(dir='.')
        print('working dir : ', working_dir.name)

        req=requests.put('http://'+UrlApi+':8080/api/cluster?host='+HostName)
        id_cluster = req.json()[0]['id']
        print(strId, "id_cluster = ", str(id_cluster))
        while True:
            req=requests.get('http://'+UrlApi+':8080/api/job/ready?id_cluster='+str(id_cluster))
            if(len(req.json())!=0):
                id_job = req.json()[0]['id']
                command = req.json()[0]['command']
                print(strId, "L'identifiant du job "+str(id_job)+" est disponible")
                print(strId, "Execution de la commande "+ str(command))
                array_command = command.split()
                return_code = 999
                try:
                    proc = subprocess.Popen(array_command, stdout=subprocess.PIPE, cwd=working_dir.name)
                    (out, err) = proc.communicate()
                    status='done'
                    return_code = proc.returncode
                    json_data = out.decode()

                except Exception as ex:
                    print('failed : ', ex)
                    status='failed'
                    json_data=str(ex)
                
                if (return_code != 0):
                    status='failed'

                print('Mise a jour : ', return_code, status, json_data)
                req=requests.post('http://'+UrlApi+':8080/api/job?id='+str(id_job)+'&status='+str(status)+'&return_code='+str(return_code), json={"log": json_data})
            time.sleep(random.randrange(10))
    except KeyboardInterrupt:
        print("on demande au process de s'arreter")
        req=requests.post('http://'+UrlApi+':8080/api/cluster/unavailable?id='+str(id_cluster))
    print(strId, "end thread ")

if __name__ == "__main__":

    print("Demarrage du client GPAO")
    print("Hostname : ", HostName)

    pool = multiprocessing.Pool(NbProcess)
    original_sigint_handler = signal.signal(signal.SIGINT, signal.SIG_IGN)

    try:
        pool.map(process, range(NbProcess))

    except KeyboardInterrupt:
        print("on demande au pool de s'arreter")
        pool.terminate()
    else:
        print("Normal termination")
        pool.close()
    pool.join()
 
    print("Fin du client GPAO")
