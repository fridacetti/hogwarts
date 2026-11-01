# Pseudokode

## GET/Courses

### Henter alle

```
Når der sendes et GET/Courses, så bliver databasen bedt om at sende alle rækker i tabellen tilbage som en liste af JSON.
```

## GET/Courses/:id

### Henter ét

```
Når der sendes et GET/Courses/:id, så læses id'et fra URL'en, og databasen bliver bedt om at sende det course, som har det matchende id.
Hvis course findes: Så sendes course tilbage som JSON og med status 200.
Ellers: Så sendes status 404 (not found).
```

## POST/Courses

### Opret ny

```
Når der sendes et POST/Courses, så læses name og teacher_id fra request body, og databasen bliver bedt om at oprette et nyt course med de værdier.
Det nye course sendes tilbage som JSON og med status 201 (created).
```

## PUT/Courses/:id

### Erstat eksisterende data

```
Når der sendes et PUT/Courses/:id, så læses id'et fra URL'en, og name og teacher_id læses fra request body. Databasen bliver bedt om at opdatere det course, som har det matchende id, med de nye værdier.
Hvis course findes: Så sendes det opdaterede course tilbage som JSON og med status 200.
Ellers: Så sendes status 404 (not found).
```

## DELETE/Courses/:id

### Slet

```
Når der sendes et DELETE/Courses/:id, så læses id'et fra URL'en, og databasen bliver bedt om at slette det course, som har det matchende id. De tilhørende rækker i courses_students bliver slettet automatisk (ON DELETE CASCADE).
Hvis course findes: Så sendes det slettede course tilbage som JSON og med status 200.
Ellers: Så sendes status 404 (not found).
```

## PUT/Courses/:id/teacher/:teacherId

### Sæt en teacher på et course

```
Når der sendes et PUT/Courses/:id/teacher/:teacherId, så læses både course-id og teacher-id fra URL'en, og databasen bliver bedt om at ændre teacher_id på det course, som har det matchende id.
Hvis course findes: Så sendes det opdaterede course tilbage som JSON og med status 200.
Ellers: Så sendes status 404 (not found).
```

## PUT/Courses/:id/students/:studentId

### Tilføj en student til et course

```
Når der sendes et PUT/Courses/:id/students/:studentId, så
```
