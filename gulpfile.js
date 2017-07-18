const gulp = require("gulp");
const sass = require("gulp-sass");
const browserify = require("gulp-browserify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

const config = {   //crear objetos que nos permitan cambiar la configuración
	source: "./src/",
	dist: "./public",
};
const paths = { 
	html: "**/*.html",
	sass:"assets/scss/**/*.scss",  //aquí irán los archivos scss
	mainSass: "assets/scss/main.scss"  //ubica el main
};
const sources = {
	html: config.source + paths.html,
	//"./src/**/*.html"
	sass: config.source + paths.sass,
	rootSass: config.source + paths.mainSass,
};

gulp.task("mover_html", () => {  //se crea la tarea
	gulp.src(sources.html)  //va a buscar en src todos los archivos que terminen en .html y los abrirá
		.pipe(gulp.dest(config.dist));  //toda la informaci+on que se le mande será enviada a dist
});

gulp.task("sass", () => {
	gulp.src(sources.rootSass)
	.pipe(sass({
		outputStyle: "compressed",
	}).on("error", sass.logError)) //cuando haya un error en sass se va a ejecutar la función de error
	.pipe(gulp.dest(config.dist + "/assets/css"))
	//"public" + "/assets/css" 
});

gulp.task("js", () => {
	gulp.src("./src/assets/js/*.js")
		.pipe(browserify())
		.pipe(rename("bundle.js"))
		.pipe(gulp.dest("./public/assets/js"));
});

gulp.task("sass-watch", ["sass"], () => {  //entre corchetes va la tarea que se debe terminar de ejecutar
	browserSync.reload();
	done();
});

gulp.task("serve", () => {
	browserSync.init({
		server: {
			baseDir: "./public"
		}
	})
	gulp.watch("./src/assets/scss/main.scss", ["sass-watch"])
});