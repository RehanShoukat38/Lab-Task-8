# Lab 08 answers

**(a) Why can an interface not be an injection token?** TypeScript interfaces are erased during compilation and have no runtime identity. Nest needs a runtime value such as a string, Symbol or class to look up a provider.

**(b) What does singleton mean?** A default-scope provider has one shared instance in the application context. Consumers resolving the same provider receive that instance rather than constructing a new service for every request.

**(c) How can OtherModule use CoursesService?** Add CoursesService to the exports array of CoursesModule. Import CoursesModule in OtherModule and inject CoursesService through the consumer's constructor.
