from os import listdir, stat, environ
from os.path import isfile, join
import pickle
from subprocess import call
import sys

DB_FILE_NAME = 'db'
JAVA_HOME = environ['JAVA_HOME']
JDK_DEPEND = ['jre\\lib\\resources.jar', 'jre\\lib\\rt.jar', 'jre\\lib\\jsse.jar', 'jre\\lib\\jce.jar', 'jre\\lib\\charsets.jar', 'jre\\lib\\jfr.jar']
LIB_DEPEND = ['classes', 'lib\\bz-allinone.jar', 'lib\\commons-codec-1.5.jar', 'lib\\commons-io-1.4.jar', 'lib\\commons-lang-2.4.jar', 'lib\\commons-logging-1.1.1.jar', 'lib\\commons-pool-1.5.5.jar', 'lib\\gson-2.2.4.jar', 'lib\\httpclient_4.5.2.jar', 'lib\\httpcore_4.4.4.jar', 'lib\\json.jar', 'lib\\log4j-1.2.15.jar', 'lib\\slf4j-api-1.6.1.jar', 'lib\\slf4j-log4j12-1.6.1.jar', 'lib\\spymemcached.jar', 'lib\\xstream-1.3.1.jar']
PARAMS = '-g -Xlint:all -Xlint:-cast -Xlint:-classfile -Xlint:-dep-ann -Xlint:-empty -Xlint:-fallthrough -Xlint:-path -Xlint:-processing -Xlint:-rawtypes -Xlint:-serial -Xlint:-unchecked -verbose'

def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)

def load_db():
    if isfile(DB_FILE_NAME + '.pkl'):
        return load_obj(DB_FILE_NAME)
    else:
        return {}

def save_db(filedict):
    save_obj(filedict, DB_FILE_NAME)

def add_jdk_prefix(s):
    return JAVA_HOME + '\\' + s

def build_command(files):
    command = 'javac ' + PARAMS
    command += ' -bootclasspath ' + ';'.join(map(add_jdk_prefix, JDK_DEPEND))
    command += ' -sourcepath src -d classes'
    command += ' -classpath ' + ';'.join(LIB_DEPEND)
    command += ' ' + ' '.join(files)
    return command;

def get_java_file_list(dir):
    filedict = {}
    for f in listdir(dir):
        path = join(dir, f)
        if isfile(path):
            if (f.endswith('.java')):
                filedict[path] = stat(path).st_mtime
        else:
            filedict.update(get_java_file_list(path))
    return filedict

if (len(sys.argv) > 1 and sys.argv[1] == 'rebuild'):
    lstdict = {}
else:
    lstdict = load_db(); # last dict

crtdict = get_java_file_list('src') # current dict

changed_files = []
for f in crtdict.keys():
    if not f in lstdict:
        changed_files.append(f)
    elif crtdict[f] != lstdict[f]:
        changed_files.append(f)

save_db(crtdict)

for f in changed_files:
    print('[CHANGE] ' + f)

print('\n -- BUILD --\n')

if len(changed_files) > 0:
    command = build_command(changed_files)
    print command
    call(command.split(' '))
else:
    print("Nothing changed")
