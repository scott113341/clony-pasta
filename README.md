# clony-pasta


```
{
  "name": "{{ if namespace? }}@{{ namespace }}/{{ end }}{{ name }}",
  "private": {{ if private? }}true{{ else }}false{{ end }}
}
```


* `{{ if travis_ci? }}.travis.yml{{ end }}`
  * `travis_ci? = true` => `.travis.yml` exists
  * `travis_ci? = false` => `.travis.yml` does not exist


* `README{{ if markdown_readme? }}.md{{ end }}`
  * `markdown_readme? = true` => `README.md` exists
  * `markdown_readme? = false` => `README` exists

* `{{ if markdown_readme? }}README.md{{ else }}README{{ end }}`
  * `markdown_readme? = true` => `README.md` exists
  * `markdown_readme? = false` => `README` exists

* `{{ if markdown_readme? }}README.md{{ else }}README.{{ readme_extension }}{{ end }}`
  * `markdown_readme? = true` => `README.md` exists
  * `markdown_readme? = false`
    * `readme_extension = "txt"` => `README.txt` exists
    * `readme_extension = "rdoc"` => `README.rdoc` exists


Reserved keywords:
* if
* else
* end


Rules:
* `if` statements can only be used with variables whose names end with a question mark `?`
* Regular `{{ interpolation }}` statements **can not** be used with variables whose names end with a question mark
* Files whose names, when evaluated, have length zero, will not be created
