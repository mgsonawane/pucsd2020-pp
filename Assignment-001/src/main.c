#include<stdio.h>
#include<stdlib.h>
#include"../include/add.h"
int main()
{
	char m;
	printf("!!!!!!!!Welcome to my calculator!!!!!!!!\n");
	char op='0';
	char c;
	do
	{
		int flag=0;
		long int m1=0,m2=0,m3=0,a=0,b=0;
		for(int i=0;(m=getchar() )!='\n';i++)
		{
			if (i==0)
				c=m;
			if(m=='+' || m=='-'|| m=='*'|| m=='/' || m=='%')
			{
				flag = 1;
				m2=1;
				op=m;
			}
			else
			{				
				if (flag==0){
					m1=1;
					a*=10;
					a+=m-48;
				}
				else
				{
					if (flag==1)
					{
						m3=1;
						b*=10.0;
						b+=m-48;
						
					}
				}
			}
		}
		if (c=='q')
			printf("Thanks");
		if ( (m1==0 || m2==0 || m3==0) && c!='q')
			printf("Enter correct expression\n");
		else{
			switch(op)
			{
				case '+':
					printf("%ld\n",add(a,b));
					break;
				case '-':
					printf("%ld\n",sub(a,b));
					break;
				case '*':
					printf("%ld\n",mult(a,b));
					break;
				case '/':
					printf("%Lf\n",divv(a,b));
					break;
				case '%':
					printf("%Lf\n",per(a,b));
					break;

			}
		}
	}
	while(c!='q');
return 0;
}
