//  Основной модуль
import gulp from "gulp";
//  Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов 
import { plugins } from "./gulp/config/plugins.js"

//  Передвем значения в глобальную переменую 
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

//  Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html} from "./gulp/tasks/html.js";
import { server} from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//  Наблюдатель за изминениями в файлах 
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive };

// Последовательна обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основние задачки
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//  Построения сценария виполнения задач
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZIP = gulp.series(reset, mainTask, zip);
const deployFTP = gulp.series(reset, mainTask, ftp);

// Експорт сценариев 
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

//  Виполнения сценария по умолчанию 
gulp.task('default', dev);