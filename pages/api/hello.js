// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  res.status(200).json({ name: 'John Doe'})

  res.status(200).json({ name: 'John Doe', id:"34", phone:"989799898" })

}
