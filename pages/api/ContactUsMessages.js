export default async function GetContactUsMessages (){
    const response = await fetch('https://2if7bk5j1b.execute-api.us-east-1.amazonaws.com/msg/messages');
    const data = await response.json();
    return data;
}