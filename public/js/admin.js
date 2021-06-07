console.log('file call')
let role = localStorage.getItem('role')

role = role.toLowerCase()
console.log(role)
if (!role.includes('admin')) {
  let d = document.getElementById('admin')
  d.style.display = 'none'
}
