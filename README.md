# Hogwarts opgave

## Endpoints

Base-URL:

```text
http://localhost:3000
```

### Houses

| Metode | Endpoint      | Beskrivelse    | Succes             | Fejl                                                 |
| ------ | ------------- | -------------- | ------------------ | ---------------------------------------------------- |
| `GET`  | `/houses`     | Hent alle huse | `200` med en liste | `500` ved databasefejl                               |
| `GET`  | `/houses/:id` | Hent ét hus    | `200` med huset    | `404` hvis huset ikke findes, `500` ved databasefejl |

### Students

| Metode   | Endpoint        | Beskrivelse                | Succes                        | Fejl                                                  |
| -------- | --------------- | -------------------------- | ----------------------------- | ----------------------------------------------------- |
| `GET`    | `/students`     | Hent alle elever           | `200` med en liste            | `500` ved databasefejl                                |
| `GET`    | `/students/:id` | Hent én elev               | `200` med eleven              | `404` hvis eleven ikke findes, `500` ved databasefejl |
| `POST`   | `/students`     | Opret en elev              | `201` med den nye elev        | `500` ved databasefejl                                |
| `PUT`    | `/students/:id` | Erstat elevens navn og hus | `200` med den opdaterede elev | `404` hvis eleven ikke findes, `500` ved databasefejl |
| `DELETE` | `/students/:id` | Slet en elev               | `200` med den slettede elev   | `404` hvis eleven ikke findes, `500` ved databasefejl |

### Teachers

| Metode   | Endpoint        | Beskrivelse                 | Succes                         | Fejl                                                   |
| -------- | --------------- | --------------------------- | ------------------------------ | ------------------------------------------------------ |
| `GET`    | `/teachers`     | Hent alle lærere            | `200` med en liste             | `500` ved databasefejl                                 |
| `GET`    | `/teachers/:id` | Hent én lærer               | `200` med læreren              | `404` hvis læreren ikke findes, `500` ved databasefejl |
| `POST`   | `/teachers`     | Opret en lærer              | `201` med den nye lærer        | `500` ved databasefejl                                 |
| `PUT`    | `/teachers/:id` | Erstat lærerens navn og hus | `200` med den opdaterede lærer | `404` hvis læreren ikke findes, `500` ved databasefejl |
| `DELETE` | `/teachers/:id` | Slet en lærer               | `200` med den slettede lærer   | `404` hvis læreren ikke findes, `500` ved databasefejl |

### Courses

| Metode   | Endpoint                           | Beskrivelse                    | Succes                          | Fejl                                                      |
| -------- | ---------------------------------- | ------------------------------ | ------------------------------- | --------------------------------------------------------- |
| `GET`    | `/courses`                         | Hent alle kurser               | `200` med en liste              | `500` ved databasefejl                                    |
| `GET`    | `/courses/:id`                     | Hent ét kursus                 | `200` med kurset                | `404` hvis kurset ikke findes, `500` ved databasefejl     |
| `POST`   | `/courses`                         | Opret et kursus                | `201` med det nye kursus        | `500` ved databasefejl                                    |
| `PUT`    | `/courses/:id`                     | Erstat kursusets navn og lærer | `200` med det opdaterede kursus | `404` hvis kurset ikke findes, `500` ved databasefejl     |
| `DELETE` | `/courses/:id`                     | Slet et kursus                 | `200` med det slettede kursus   | `404` hvis kurset ikke findes, `500` ved databasefejl     |
| `PUT`    | `/courses/:id/teacher/:teacherId`  | Tilknyt en lærer til et kursus | `200` med det opdaterede kursus | `404` hvis kurset ikke findes, `500` ved databasefejl     |
| `PUT`    | `/courses/:id/students/:studentId` | Tilknyt en elev til et kursus  | `200` uden response-body        | `500` ved databasefejl                                    |
| `DELETE` | `/courses/:id/students/:studentId` | Fjern en elev fra et kursus    | `204` uden response-body        | `404` hvis relationen ikke findes, `500` ved databasefejl |

## Test af API'et - Bruno

Jeg har brugt Bruno, så inde i [`hogwarts-API-test/`](./hogwarts-API-test/). er det requests til alle endpoints, og de er opdelt i mapper efter hver kategori.
