# Student grades Node.js app

# Identyfikacja raportu

**Nazwa przedmiotu:** Programowanie Ruby

**Grupa**: S2232

**Rok**: II (III semestr)

**Osoby tworzące projekt**:

- Filip Szczepański
- Mateusz Sobczyk

# Cel projektu

Stworzenie aplikacji webowej, która pozwoli użytkownikom (**studentom**) na wprowadzenie otrzymanych przez nich **ocen** oraz wyświetlenie podstawowych **statystyk** dotyczących ich **wyników w nauce.**

# Lista funkcjonalności

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.30.29.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.30.29.png)

## Strona główna

```jsx
app.get('/', (req, res) => {
    res.send('Welcome to Student Grades app!')
})
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.07.44.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.07.44.png)

## Zablokowana próba nieautoryzowanego dostępu (weryfikacja tokenu)

```jsx
const token =  req.header('auth-token');
if(!token) return res.status(400).send('Acces Denied!');
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.09.02.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.09.02.png)

# Rejestracja

### Zastosowanie mechanizmu walidacji

```jsx
const {error} = registerValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.22.23.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.22.23.png)

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.23.19.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.23.19.png)

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.22.56.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.22.56.png)

### Odpowiedź przy próbie założenia konta na istniejący już w bazie adres email.

```jsx
const emailExist = await User.findOne({email: req.body.email});
if(emailExist) return res.status(400).send('Email already in database!');
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.38.10.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.38.10.png)

### Odpowiedź po prawidłowej rejestracji

```jsx
const savedUser = await user.save();
res.send({user: user._id});
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.23.40.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.23.40.png)

# Logowanie

Logowanie korzysta z tego samego rodzaju walidacji co rejestracja.

### Odpowiedź po podaniu adresu email, którego nie ma w bazie

```jsx
const user = await User.findOne({ email: req.body.email});
if (!user) return res.status(400).send('Email not found');
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.32.49.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.32.49.png)

### Odpowiedź po podaniu błędnego hasła

```jsx
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('Invalid password');
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.33.42.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.33.42.png)

### Odpowiedź po prawidłowym zalogowaniu

```jsx
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.31.45.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-19_at_18.31.45.png)

## Studies

```java
router.get('/', verification, StudiesController.allStudies);
router.post('/', verification, StudiesController.newStudy);
router.get('/:studyId', verification,  StudiesController.detailsStudy);
router.patch('/:studyId', verification,  StudiesController.updateStudy);
router.delete('/:studyId', verification,  StudiesController.deleteStudy);
```

### Get Studies

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.20.57.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.20.57.png)

### Post Study

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.19.48.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.19.48.png)

### Get Study

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.21.30.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.21.30.png)

### Patch  Study

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.23.00.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.23.00.png)

### Delete Study

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.23.14.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.23.14.png)

# Statistics

### Mediana

```java
router.get('/median', verification, async (req, res) => {
    try{
        const studies = await Study.find({user: req.user._id});
        var result = studies.map(item => {
            var mappedItem = {
                "title": item.title,
                "median": math.median(item.grades)
            }
            return mappedItem;
        })
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
})
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.24.42.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.24.42.png)

### Średnia

```java
router.get('/mean', verification, async (req, res) => {
    try{
        const studies = await Study.find({user: req.user._id});
        var result = studies.map(item => {
            var mappedItem = {
                "title": item.title,
                "mean": math.mean(item.grades)
            }
            return mappedItem;
        })
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
})
```

![Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.25.12.png](Student%20grades%20Node%20js%20app%20212c5d54732545a68f2bc6e9e0a9ad43/Screenshot_2021-01-21_at_23.25.12.png)