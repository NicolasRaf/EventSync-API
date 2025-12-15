import { app } from './app';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API docs on http://localhost:${PORT}/api-docs`)
});
