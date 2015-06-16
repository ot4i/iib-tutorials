   function importArtifacts() {

      var result = null;
      var tut = null;
      try {
            
           result = javaGetSelectedTutorialFunction();
           
           var tutInfoString = result[0];
           tut = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error in javaGetSelectedTutorialFunction occurred: ' + e.message );
      }//catch

      if (tut !== undefined){

        try {
           result = javaImportPIFileFunction(tut.name,tut.zipURL);
        }//try
        catch(e){
          alert( 'a java error in javaImportPIFileFunction occurred: ' + e.message );
        }//catch

      }//if
   };


   function openResource(id) {
	        try {
	           result = javaOpenResourceEditorTutorialFunction(id);
	        }//try
	        catch(e){
	          alert( 'a java error in javaImportPIFileFunction occurred: ' + e.message );
	        }//catch
   };
   
   function cleanUp() {

      var result = null;
      var tut = null;
      try {
    	  result = javaGetSelectedTutorialFunction();
          var tutInfoString = result[0];
          tut = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error in javaGetSelectedTutorialFunction occurred: ' + e.message );
      }//catch

      if (tut !== undefined){

        try {
        	result = javaUnDeployResourcesFunction();
        }//try
        catch(e){
          alert( 'a java error in javaUnDeployResourcesFunction occurred: ' + e.message );
        }//catch

        try {
        	//alert(tut.projects);
           result = javaDeleteProjectsFromWorkspaceFunction(tut.projects.split(":"));
        }//try
        catch(e){
          alert( 'a java error in javaDeleteProjectsFromWorkspaceFunction occurred: ' + e.message );
        }//catch
      }//if
   };

   function deployArtifacts() {
      var result = null;
      var tut = null;
      try {
            
           result = javaGetSelectedTutorialFunction();
           
           var tutInfoString = result[0];
           tut = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error in javaGetSelectedTutorialFunction occurred: ' + e.message );
      }//catch

      if (tut !== undefined){

        try {
           result = javaDeployBARFunction( tut.barFile );
        }//try
        catch(e){
          alert( 'a java error in javaDeployBARFunction occurred: ' + e.message );
        }//catch


      }//if


   };

   function backToGallery() {
      var result=null;

        try {
           result = javaBackToGalleryFunction();
        }//try
        catch(e){
          alert( 'a java error in javaBackToGalleryFunction occurred: ' + e.message );
      }//catch




   };


   function openExternalBrowser(externalURL) {


      var result = null;

      try {
           result = javaOpenURLInExternalBrowserFunction( externalURL );
      }//try
      catch(e){
          alert( 'a java error in javaOpenURLInExternalBrowserFunction occurred: ' + e.message );
      }//catch


   };

   function openHelpSystem(helpURL) {

      var result = null;

      try {
           result = javaOpenURLInHelpSystemFunction( helpURL);
      }//try
      catch(e){
          alert( 'a java error in javaOpenURLInHelpSystemFunction occurred: ' + e.message );
      }//catch
   };


   function viewDetails() {
      var result = null;
      var tut = null;
      try {
            
           result = javaGetSelectedTutorialFunction();
           
           var tutInfoString = result[0];
           tut = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error in javaGetSelectedTutorialFunction occurred: ' + e.message );
      }//catch

      if (tut !== undefined){

        try {
           result = javaBackToDetailsFunction(tut.detailsURL);
        }//try
        catch(e){
          alert( 'a java error in javaBackToDetailsFunction occurred: ' + e.message );
        }//catch

      }//if

   };
