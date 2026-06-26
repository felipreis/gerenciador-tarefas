function responseHttp(data,res){
    if(!data){
        res.status(400).json({ message: 'problemas na requisição'})
    }else{
        res.status(200).json(data)
    }
}

export default responseHttp;