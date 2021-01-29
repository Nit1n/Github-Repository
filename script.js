const type = document.getElementById('type') ; 
const userName = document.getElementById('name') ; 
const result = document.querySelector('.result') ;
const submitBtn = document.getElementById('submit'); 
const nextBtn = document.querySelector('.next') ; 

let baseUrl = 'https://api.github.com' ; 
let pageNo = 1 ;
let indexNo = 1 ;  
let prevUserName ='' ; 
let prevType = '' ; 

function display(response){
    
    
    while(result.firstChild){
        result.removeChild(result.firstChild) ; 
    }
    if(response.message === 'Not Found'){
        const para = document.createElement('p') ; 
        para.textContent='User not found' ; 
        result.appendChild(para) ;
        return ;
    }

    if(response.length === 0){
        const para =  document.createElement('p') ; 
        para.textContent = 'Nothing More to Show' ; 
        result.appendChild(para) ; 
        return ;    
    } 
    for(const repos of response){
        const repo = document.createElement('div') ; 
        const h3 = document.createElement('h3') ; 
        const section1 = document.createElement('section') ;
        const para2 = document.createElement('p') ; 
        const para3 = document.createElement('p') ; 
        const para4 = document.createElement('p') ; 
        
        const strong1= document.createElement('strong') ; 
        const strong2= document.createElement('strong') ; 
        const strong3= document.createElement('strong') ;
        const strong4= document.createElement('strong') ;
        
        const link1 = document.createElement('a') ; 
        const span1 = document.createElement('span') ; 
        const span2 = document.createElement('span') ; 
        const span3 = document.createElement('span') ; 
        
        repo.setAttribute('class' , 'repo');
        h3.textContent = indexNo + ': ' + repos.name ; 
        
        strong1.textContent = 'Url : '  ; 
        link1.href =  repos.html_url ;
        link1.textContent = repos.html_url; 
        section1.appendChild(strong1) ; 
        section1.appendChild(link1) ; 
        
        strong2.textContent = 'Forked: ' ; 
        span1.textContent = (repos.fork)?'True':'False' ; 
        para2.appendChild(strong2) ; 
        para2.appendChild(span1) ;
        
        strong3.textContent = 'Forks_count: ' ; 
        span2.textContent = repos.forks_count ; 
        para3.appendChild(strong3) ; 
        para3.appendChild(span2) ; 

        strong4.textContent = 'Open Issue Count: ' ; 
        span3.textContent = repos.open_issues_count ; 
        para4.appendChild(strong4) ; 
        para4.appendChild(span3) ; 

        repo.appendChild(h3) ; 
        repo.appendChild(section1) ;
        repo.appendChild(para2) ; 
        repo.appendChild(para3) ; 
        repo.appendChild(para4) ; 
        
        result.appendChild(repo) ;

        indexNo++ ; 
    }
}
submitBtn.addEventListener('click' , function(e){
    e.preventDefault();
    pageNo =1 ; 
    indexNo = 1 ; 
    if(type.value !== '' && userName.value !== ''){
        let url = baseUrl + '/' + type.value + '/' + userName.value+ '/repos' + '?page=' +pageNo + '&per_page=10' ; 
        console.log(url) ;
        fetch(url).then(result =>{
            return result.json() ;
        }).then(response =>{
            display(response); 
        })
    }else{
        while(result.firstChild){
                result.removeChild(result.firstChild) ; 
        }
        const para= document.createElement('p') ; 
        para.textContent = 'input field is required to be filled' ; 
        result.appendChild(para) ; 
    }
    prevUserName = userName.value ; 
    prevType = type.value ; 
    userName.value = '' ; 
    userName.focus();
})

nextBtn.addEventListener('click' , function(){
    pageNo++ ; 
    if(prevType !== '' && prevUserName !== ''){
        let url = baseUrl + '/' + prevType+ '/' + prevUserName+ '/repos' + '?page=' +pageNo + '&per_page=10' ; 
        console.log(url) ;
        fetch(url).then(result =>{
            return result.json() ;
        }).then(response =>{
            display(response); 
        })
    }else{
        while(result.firstChild){
                result.removeChild(result.firstChild) ; 
        }
        const para= document.createElement('p') ; 
        para.textContent = 'input field is required to be filled' ; 
        result.appendChild(para) ; 
    }
})