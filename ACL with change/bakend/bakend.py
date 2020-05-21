from flask import Flask, request,json,jsonify,redirect
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
#from flask import customer_current__loginid
global customer_current__loginid
global customer_name
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'acl'
app.config['MYSQL_PASSWORD'] = 'm'
app.config['MYSQL_DB'] = 'acldb'

mysql = MySQL(app)

jwt=JWTManager(app)
CORS(app)


@app.route('/login',methods=['GET','POST'])
def login():
    usr=json.loads(request.data)
    #print (usr['uname'])
    m=0
    cur=mysql.connection.cursor()
    sql1=("select group_id from group_members as m,user as u where u.user_id=m.user_id and user_name=%s")
    sql1=cur.execute(sql1,(usr['uname'],) )
    sql1=cur.fetchall()
    print (type(sql1))
    cur.execute("truncate current_file")
    cur.execute("truncate logged_user")
    if ( usr['utype']=='user' ) :
        sql=("select user_id from user where user_name=%s and user_pass=%s")
        sql=cur.execute(sql,(usr['uname'],usr['pass']))
        sql=cur.fetchall()
        if (len(sql1)>0) :
            for fn in sql1 :
                cur.execute("insert into logged_user(user_id,group_id) values(%s,%s)",(str(sql[0][0]),fn[0], ) )
        else :
            cur.execute("insert into logged_user(user_id,group_id) values(%s,%s)",(str(sql[0][0]),'-1', ) )
        if (len(sql)>0) :
            m=1
            cur.execute("INSERT INTO current_file(fid) VALUES(%s)",( str(0)))
    else :
        if ( usr['utype']=='admin' ) :
            sql=("select admin_id from admin where admin_name=%s and admin_pass=%s")
            sql=cur.execute(sql,(usr['uname'],usr['pass']))
            sql=cur.fetchall()
            if (len(sql)>0) :
                m=2
                cur.execute("INSERT INTO current_file(fid) VALUES(%s)",( str(0)))
    mysql.connection.commit()
    cur.close()
    return jsonify(m)
##########################signup##################################
@app.route('/signup',methods=['GET','POST'])
def signup():
    m=0
    usr=json.loads(request.data)
    cur=mysql.connection.cursor()
    if ( usr['utype']=='user' ) :
        sql=('select user_id from user where user_name=%s')
        sql=cur.execute(sql,(str(usr['uname']), ))
        sql=cur.fetchall()
        if (len(sql) <1) :
            cur.execute("INSERT INTO user(user_name,user_pass) VALUES (%s,%s)", (str(usr['uname']),str(usr['pass'])))
        else :
            m=1
    else :
            sql=('select admin_id from admin where admin_name=%s')
            sql=cur.execute(sql,(str(usr['uname']), ))
            sql=cur.fetchall()
            if (type(sql[0][0]) is int) :
                cur.execute("INSERT INTO admin(admin_name,admin_pass) VALUES (%s,%s)",(str(usr['uname']),str(usr['pass'])))
            else :
                m=1
    mysql.connection.commit()
    cur.close()
    return jsonify(m)

########################getlogged###################################
@app.route('/getfiles',methods=['GET','POST'])
def getfiles():
    cur=mysql.connection.cursor()
    sql1=cur.execute("select user_id,group_id from logged_user")
    sql1=cur.fetchall()
    sql=cur.execute("select fid from current_file")
    sql=cur.fetchall()
    usr=sql[0][0]
    result={}
    perm=0
    if (sql1[0][1]>-1) :
        if (sql[0][0] >0):
            sql=cur.execute("select f.fid,fname,isfolder,fparent from files as f ,(select gm.group_id ,gm.user_id from group_members as gm) as f1,(select lu.group_id from logged_user as lu) as f2 where f.user_id=f1.user_id and f1.group_id=f2.group_id and f.fparent=%s",(str(usr),))
            sql=cur.fetchall()
        else :
            sql=cur.execute("select f.fid,fname,isfolder,fparent from files as f ,(select gm.group_id ,gm.user_id from group_members as gm) as f1,(select lu.group_id from logged_user as lu) as f2 where f.user_id=f1.user_id and f1.group_id=f2.group_id ")
            sql=cur.fetchall()
        perm=cur.execute("select f.fauth_r,f.fauth_w,fauth_x from groupp as f,(select group_id from logged_user where group_id=1) as f1 where f.group_id=f1.group_id")
        perm=cur.fetchall()
    result['all']=sql
    if (usr>0):
            sql=("select fid,fname,isfolder,fparent from files where user_id=%s and fparent=%s ")
            sql=cur.execute(sql,(str(sql1[0][0]),str(usr),) )
            sql=cur.fetchall()
    else :
            sql=("select fid,fname,isfolder,fparent from files where user_id=%s")
            sql=cur.execute(sql,str(sql1[0][0]))
            sql=cur.fetchall()
    result['user']=sql
    result['permit']=perm
    print (result['user'])
    mysql.connection.commit()
    cur.close()
    return jsonify(result)

####################files##########################################
@app.route('/create_file',methods=['GET','POST'])
def create_file():
    usr=json.loads(request.data)
    cur=mysql.connection.cursor()
    m=1
    if (usr['ftype']=='file') :
        m=0
    sql=cur.execute("select user_id from logged_user")
    sql=cur.fetchall()
#    print (usr)
    sql1=cur.execute("select fid from current_file")
    sql1=cur.fetchall()
    if (sql1[0][0]>0) :
        cur.execute("insert into files(isfolder,fname,fparent,user_id,fauth_r,fauth_w,fauth_x) values(%s,%s,%s,%s,%s,%s,%s)",(str(m),str(usr['fname']),str(sql1[0][0]),str(sql[0][0]),'1','1','1') )
    else :
        cur.execute("insert into files(isfolder,fname,user_id,fauth_r,fauth_w,fauth_x) values(%s,%s,%s,%s,%s,%s)",(str(m),str(usr['fname']),str(sql[0][0]),'1','1','1') )
    mysql.connection.commit()
    cur.close()
    return jsonify(sql[0])


#####################next folder####################################
@app.route('/nextfold',methods=['GET','POST'])
def nextfold():
    id=json.loads(request.data)
    id=str(id)
    cur=mysql.connection.cursor()
    cur.execute("truncate current_file")
    sql=("insert into current_file(fid) values (%s)")
    sql1=("insert into tracefile(fid) values (%s)")
    cur.execute(sql,(str(id),) )
    cur.execute(sql1,(str(id),) )
    mysql.connection.commit()
    cur.close()
    return jsonify(1)
################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
@app.route('/signout',methods=['post'])
def signout():
    cur=mysql.connection.cursor()
    cur.execute("truncate current_file")
    cur.execute("truncate logged_user")
    cur.execute("truncate tracefile")
    #print ("hello")
    mysql.connection.commit()
    cur.close()
    return jsonify(1)
###############Back button#############
@app.route('/prevfold',methods=['get','post'])
def prevfold():
    cur=mysql.connection.cursor()
    sql=cur.execute('select max(tid) from tracefile')
    sql=cur.fetchall()
    print ((sql[0][0]))
    if (type(sql[0][0]) is int) :
        sql1=('delete from tracefile where tid=%s')
        sql1=cur.execute(sql1,(str(sql[0][0]),))
        cur.execute("truncate current_file")
        if (sql[0][0]==1):
            cur.execute("truncate tracefile")
            sql=("insert into current_file(fid) values (%s)")
            cur.execute(sql,('0',))
            mysql.connection.commit()
            cur.close()
            return jsonify(1)
        elif (sql[0][0]>1):
            sql2=cur.execute('select fid from tracefile where tid=(select max(tid) from tracefile)')
            sql2=cur.fetchall()
            sql=("insert into current_file(fid) values (%s)")
            cur.execute(sql,str(sql2[0][0],))
            mysql.connection.commit()
            cur.close()
            return jsonify(1)
    else :

            mysql.connection.commit()
            cur.close()
            return jsonify(0)

@app.route('/getusers',methods=['GET','POST'])
def getusers():
    cur=mysql.connection.cursor()
    sql=cur.execute('select user_id,user_name from user')
    sql=cur.fetchall()
    print (sql)
    mysql.connection.commit()
    cur.close()
    return jsonify(sql)
@app.route('/createGroup',methods=['GET','POST'])
def createGroup():
    usr1=json.loads(request.data)
    usr=usr1['users']
    print (usr)
    print (usr1)
    cur=mysql.connection.cursor()
    sql1=('select group_id from groupp where group_name=%s')
    sql1=cur.execute(sql1,(usr1['name'],))
    sql1=cur.fetchall()
    sql1=list(sql1)
    if ( len(sql1) != 0 ) :
        mysql.connection.commit()
        cur.close()
        return jsonify(2)
    else :
        sql=cur.execute('insert into groupp(group_name,fauth_r,fauth_w,fauth_x) values(%s,%s,%s,%s)' , (str(usr1['name']),str(usr1['read']),str(usr1['write']),str(usr1['execute']) ) )
        # cur.execute(sql,(str(usr1['name']),str(usr1['read']),str(usr1['write']),str(usr1['execute']), ))
        sql=cur.execute('select group_id from groupp where group_name=%s',(usr1['name'],))
        sql=cur.fetchall()
        for i in range(0,len(usr) ) :
                sql3=('insert into group_members(group_id,user_id) values(%s,%s)')
                cur.execute(sql3,( str(sql[0][0]),str(usr[i]), ))
        mysql.connection.commit()
        cur.close()
    mysql.connection.commit()
    cur.close()
    return jsonify(0)
@app.route('/getgroup',methods=['GET'])
def getgroup():
    cur=mysql.connection.cursor()
    sql=cur.execute('select group_id,group_name from groupp')
    sql=cur.fetchall()
    print (sql)
    mysql.connection.commit()
    cur.close()
    return jsonify(sql)

@app.route('/changepermission',methods=['POST','GET'])
def changepermission():
    usr=json.loads(request.data)
    print (usr)
    cur=mysql.connection.cursor()
    sql=('UPDATE groupp SET fauth_r=%s, fauth_w=%s ,fauth_x=%s where group_id = %s')
    sql=cur.execute(sql,(str(usr['read']),str(usr['write']),str(usr['execute']),str(usr['gid']), ),)
    mysql.connection.commit()
    cur.close()
    return jsonify('1')

@app.route('/getmembers',methods=['GET','POST'])
def getmembers():
    info=json.loads(request.data)
    cur=mysql.connection.cursor()
    sql=cur.execute('select u.user_name from user as u,(select user_id from group_members where group_id=%s) as g where u.user_id=g.user_id;',(str(info),))
    sql=cur.fetchall()
    print (sql)
    mysql.connection.commit()
    cur.close()
    return jsonify(sql)

if __name__ == '__main__':
    app.run(debug=True)
