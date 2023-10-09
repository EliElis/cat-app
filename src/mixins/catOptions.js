const fur = ['Hairless', 'Short-haired', 'Long-haired', 'Curly-haired']

const color = [
  'White',
  'Black',
  'Red (Ginger)',
  'Blue / Grey',
  'Cream',
  'Brown',
  'Cinnamon',
  'Fawn',
  'Bi-color',
  'Tabby',
  'Tri Color',
  'Tortoiseshell'
]

function valueToName(name) {
  let value = name.toLowerCase()
  value = value.replace(/[()/]/g, '')
  value = value.replace(/\s+/g, '_')
  return value
}
function generateOptions(arr) {
  return arr.map((opt) => ({
    name: opt,
    value: valueToName(opt)
  }))
}

const catOptions = {
  fur: generateOptions(fur),
  color: generateOptions(color)
}

export default catOptions
