const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    if(req.url.startsWith('/api/bmi-calculate') && req.method === 'GET'){
        const parsedUrl = url.parse(req.url,true);
        console.log(parsedUrl);
        const weight = parseFloat(parsedUrl.query.weight);
        const height = parseFloat(parsedUrl.query.height);

        if(isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0 ){
            res.writeHead(400,{ 'Content-Type':'application/json' });
            res.write(JSON.stringify({ error: 'Invalid query parameters. Please provide valid weight (kg) and height (m).' }));
            res.end();
            return;
        }

        const bmi = weight / (height * height);
        let category = "";
        if(bmi < 18.5){
            category = "Underweight";
        }else if(bmi >= 18.5 && bmi <= 24.9){
            category = "Normal weight";
        }else if(bmi >= 25 && bmi <= 29.9){
            category = "Overweight";
        }else{
            category = "Obesity";
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ weight: weight, height: height, bmi: bmi, category: category }));
        res.end();
    }
});

const PORT = Process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", ()=>{
    console.log("Server running at PORT ${PORT}");
});
