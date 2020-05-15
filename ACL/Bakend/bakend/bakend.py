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
    cur.execute("truncate current_file")
    cur.execute("truncate logged_user")
    if ( usr['utype']=='user' ) :
        sql=("select user_id from user where user_name=%s and user_pass=%s")
        sql=cur.execute(sql,(usr['uname'],usr['pass']))
        sql=cur.fetchall()
        if (len(sql)>0) :
            m=1
            sql1=sql[0][0]
            cur.execute("INSERT INTO logged_user(user_id,user_type) VALUES (%s,%s)", (str(sql[0][0]),str(usr['utype'])))
            cur.execute("INSERT INTO current_file(fid) VALUES(%s)",( str(0)))
    else :
        if ( usr['utype']=='admin' ) :
            sql=("select admin_id from admin where admin_name=%s and admin_pass=%s")
            sql=cur.execute(sql,(usr['uname'],usr['pass']))
            sql=cur.fetchall()
            if (len(sql)>0) :
                m=2
                sql1=sql[0][0]
                cur.execute("INSERT INTO logged_user(user_id,user_type) VALUES (%s,%s)", (str(sql[0][0]),str(usr['utype'])))
                cur.execute("INSERT INTO current_file(fid) VALUES(%s)",( str(0)))
    mysql.connection.commit()
    cur.close()
    return jsonify(m)
##########################signup##################################
@app.route('/signup',methods=['GET','POST'])
def signup():
    usr=json.loads(request.data)
    cur=mysql.connection.cursor()
    if ( usr['utype']=='user' ) :
            cur.execute("INSERT INTO user(user_name,user_pass) VALUES (%s,%s)", (str(usr['uname']),str(usr['pass'])))
    else :
        if ( usr['utype']=='admin' ) :
            cur.execute("INSERT INTO admin(admin_name,admin_pass) VALUES (%s,%s)",(str(usr['uname']),str(usr['pass'])))
    mysql.connection.commit()
    cur.close()
    return jsonify(1)

########################getlogged###################################
@app.route('/getfiles',methods=['GET','POST'])
def getfiles():
    cur=mysql.connection.cursor()
    sql1=cur.execute("select user_id from logged_user")
    sql1=cur.fetchall()
    sql=cur.execute("select fid from current_file")
    sql=cur.fetchall()
    usr=sql[0][0]
    if (usr>0):
        sql=("select files.fid,fname,isfolder from files,user_auth where files.fid=user_auth.fid and user_id=%s and fparent=%s and fauth_r=%s")
        sql=cur.execute(sql,(str(sql1[0][0]),str(usr),str(1),) )
        sql=cur.fetchall()
        #print (sql)
    else :
        sql=("select files.fid,fname,isfolder from files,user_auth where files.fid=user_auth.fid and user_id=%s")
        sql=cur.execute(sql,str(sql1[0][0]))
        sql=cur.fetchall()
        #print (sql)
    mysql.connection.commit()
    cur.close()
    return jsonify(sql)

####################files##########################################
@app.route('/create_file',methods=['GET','POST'])
def create_file():
    usr=json.loads(request.data)
    cur=mysql.connection.cursor()
    m=1
    if (usr['ftype']=='file') :
        m=0
    sql=cur.execute("select user_id,user_type from logged_user")
    sql=cur.fetchall()
#    print (usr)
    sql1=cur.execute("select fid from current_file")
    sql1=cur.fetchall()
    sql2=("select files.fid,fname,isfolder from files right join user_auth on files.fid=user_auth.fid where user_id=%s and fname=%s")
    sql2=cur.execute(sql2,(sql[0][0],usr['fname'],))
    sql2=cur.fetchall()
    print (sql2,"hello" )
    if (sql2):
        print ("exist")
        mysql.connection.commit()
        cur.close()
        return jsonify('exist')
    else :
        #print (sql1[0][0])
        if (sql1[0][0]>0) :
            cur.execute("insert into files(isfolder,fname,fparent) values(%s,%s,%s)",(str(m),str(usr['fname']),str(sql1[0][0])) )
            sql3=("select fid from files where fname=%s")
            sql3=cur.execute(sql3,(usr['fname'],))
            sql3=cur.fetchall()
    #        print (sql3)
            if (sql[0][1]=='user') :
                cur.execute("insert into user_auth(user_id,fid,fauth_r,fauth_w,fauth_x) values (%s,%s,%s,%s,%s)",(str(sql[0][0]),str(sql3[0][0]),'1','1','1'))
        else :
            cur.execute("insert into files(isfolder,fname) values(%s,%s)",(str(m),str(usr['fname'])) )
            sql3=("select fid,fname from files where fname=%s")
            sql3=cur.execute(sql3,(usr['fname'],))
            sql3=cur.fetchall()
    #        print (sql3)
            if (sql[0][1]=='user') :
                cur.execute("insert into user_auth(user_id,fid,fauth_r,fauth_w,fauth_x) values (%s,%s,%s,%s,%s)",(str(sql[0][0]),str(sql3[0][0]),'1','1','1'))
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
    sql=cur.execute('select * from user')
    sql=cur.fetchall()
    print (sql)
    mysql.connection.commit()
    cur.close()
    return jsonify(sql)

if __name__ == '__main__':
    app.run(debug=True)
