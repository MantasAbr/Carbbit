#include <sys/stat.h>
#include <fcntl.h>
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include<string.h> 
#include<unistd.h>
#include <stdlib.h> 

int atidaryti2(char* arg);
int atidaryti1(char* arg);

int atidaryti1(char* arg){
	int desk;
	printf("Atidarome skaitymui: %s\n", arg);
	desk = open(arg, O_RDONLY);
	return desk;
}
int atidaryti2(char* arg){
	int desk;
	printf("Atidarome skaitymui: %s\n", arg);
	desk = open(arg, O_WRONLY | O_CREAT | O_TRUNC);
	return desk;
}

int main(int argc, char* argv[]){
	size_t size = sizeof((size_t)argv);
	if(size >= 2){
		int des1 = atidaryti1(argv[1]);
		int des2 = atidaryti2(argv[2]);
		if(argv[3] != NULL){
			char str[30] = "2030300";
		    char *ptr;
		    long ret;
			ret = strtoul(str, &ptr, 10);
			printf("The number(unsigned long integer) is %lu\n", ret);
			printf("String part is |%s|", ptr);
			//read(des1, argv[1], (int)argv[3]);
		}else{
			puts("Kazkas nepavyko");
		}
	}
	else{
		puts("Blogas arg skaicius");
	}
	
	return 0;
}