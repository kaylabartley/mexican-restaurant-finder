function persistInput(input)
{
  var key = "input-" + input.id;

  var storedValue = localStorage.getItem(key);

  if (storedValue)
      input.value = storedValue;

  input.addEventListener('input', function ()
  {
      localStorage.setItem(key, input.value);
  });
}

var inputElement = document.getElementById("zip");

persistInput(inputElement);