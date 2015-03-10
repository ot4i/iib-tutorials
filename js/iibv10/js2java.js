
   /*
      Global variable to store tutorial JSON objects.
    */

   var tutorials = [];

   function viewDetails(selectName) {
	   //alert ("Inside viewDetails:" + "" + selectName);   
	   var selectBox = document.getElementById(selectName);   

       var tutUrl = "";

		//alert ("Selected index: " + selectBox.selectedIndex);
       if (tutorials !== undefined && selectBox.selectedIndex != -1) {
       		//alert ("selected tutorial value " + selectBox.options[selectBox.selectedIndex].value);
 	        tutUrl = tutorials[ selectBox.options[selectBox.selectedIndex].value ].detailsURL;
 	        //alert (tutUrl)
       }//if       

      var result = null;
      try {
           result = javaViewDetailsFunction(tutUrl);
      }//try
      catch(e){
          alert( 'a java error in javaViewDetailsFunction occurred: ' + e.message );
      }//catch
   };

   function startTutorial(selectName) 
   {
		//alert ("Inside startTutorial:" + "" + selectName);   
		var selectBox = document.getElementById(selectName);   
		//alert ("Select found. Size:" + selectBox.options.length);  

       	var tutUrl = "";
		//alert ("Selected index: " + selectBox.selectedIndex);

        if (tutorials !== undefined && selectBox.selectedIndex != -1) {
        	//alert ("selected tutorial value " + selectBox.options[selectBox.selectedIndex].value);
        	//alert (tutorials[ selectBox.options[selectBox.selectedIndex].value ].name);
  	        tutUrl = tutorials[ selectBox.options[selectBox.selectedIndex].value ].stepsURL;
  	        //alert (tutUrl);
        }//if       


      var result = null;
      try 
      {
        result = javaOpenTutorialStepsFunction(tutUrl);

      }//try
      catch(e){
          alert( 'a java error in javaOpenTutorialStepsFunction occurred: ' + e.message );
      }//catch
   };

   function startTutorialFromDetailsScreen() {
      var result = null;
      var tut = null;
      try {            
           result = javaGetSelectedTutorialFunction();
           
           var tutInfoString = result[0];
           tut = JSON.parse( tutInfoString );

      }//try
      catch(e){
          alert( 'a java error in startTutorialFromDetailsScreen occurred: ' + e.message );
      }//catch

      var tutUrl = null;
      if (tut !== undefined)
        tutUrl = tut.stepsURL;

      try {

           result = javaOpenTutorialStepsFunction(tutUrl);

      }//try
      catch(e){
          alert( 'a java error in startTutorialFromDetailsScreen occurred: ' + e.message );
      }//catch
   };

   function resetSelection(selectName) 
   {
	   //alert ("Inside resetSelection new :" + "" + selectName);  
	   //reset selection
	   try{
		   //get the appropriate select 
		   var selectBox = document.getElementById(selectName);
		   //alert(selectBox + " - select box")
		   selectBox.selectedIndex = -1;
		   //alert(selectName + " selected index is: " + selectBox.selectedIndex);
		   //passing the empty name should reset the selection
		   result = javaSetSelectedTutorialFunction("");
		   //reset the description text
		   var tutDesc = document.getElementById("tutorialDesc_" +  selectName);
		   //alert(result[0] + "   " + result[1]);
		   tutDesc.innerHTML = result[1];
	   }//try
	   catch(e)
	   {
		   alert( 'a java error in resetSelection occurred: ' + e.message );
	   }//catch   
   };
   
   function changeFunc(selectName) 
   {
	   //alert ("Inside changeFunc:" + "" + selectName);  

	   //get the appropriate select 
	   var selectBox = document.getElementById(selectName);   
	   
	   //find the appropriate tutorial desc
	   var tutDesc = document.getElementById("tutorialDesc_" +  selectName);

	   //find the tutorial value
	   var tutorialSelectValue  = selectBox.options[selectBox.selectedIndex].value;
	 	//alert ("Descriptor with the name " + "tutorialDesc_" +  selectName + " found :" + (tutorials !== undefined))
	 	//alert ("tutorialSelectValue :" + tutorialSelectValue);
	   //set the tutorial description
	   if (tutorials !== undefined) 
	   {
	   		//alert ("shortDesc :" + tutorials[tutorialSelectValue].shortDesc);
		   tutDesc.innerHTML = tutorials[tutorialSelectValue].shortDesc;
	   }     
		
	   //
	   // sets the global selected tutorial value to something or null
	   //
	   var result = null;
	   try 
	   {          
		  // alert ("Calling a java function javaSetSelectedTutorialFunction with :" + tutorials[tutorialSelectValue].name);
		   result = javaSetSelectedTutorialFunction( tutorials[tutorialSelectValue].name );
	   }//try
	   catch(e)
	   {
		   alert( 'a java error in changeFunc occurred: ' + e.message );
	   }//catch    
   };

   function backToGallery() 
   {
      var result = null;

      try 
      {
           result = javaBackToGalleryFunction();
      }//try
      catch(e)
      {
          alert( 'a java error in javaBackToGalleryFunction occurred: ' + e.message );
      }//catch

   };

   function fillList() 
   {
	   var selectedTutorialName = null;
	   //check for the selected tutorial that may be set before the view was closed
      try 
      {
		   result = javaGetSelectedTutorialFunction();
		   
		   //alert (result[0] + "   " + result[0].length);
		   if (result[0].length > 0)
		   {
		       var tutInfoString = result[0];
		       selectedTutorialName = JSON.parse( tutInfoString ).name;
		      // alert ("Selected option found: " + selectedTutorialName)
		   }
      }
	  catch(e)
	  {
		  alert( 'a java error in javaGetSelectedTutorialFunction occurred: ' + e.message );
	  }//catch
      var result = null;
      //alert("Inside fillList()");
      try {
           result = javaGetTutorialsInfoFunction();

       if (result !== undefined){
          for (var i = 0; i < result.length; i++){
             var tutInfoString = result[i];
             //alert(tutInfoString);
             var tut = JSON.parse( tutInfoString );
             tutorials.push(tut);  
          }//for 
       }//if 
      }//try
      catch(e){
          alert( 'a java error in javaGetTutorialsInfoFunction occurred: ' + e.message );
      }//catch
	  //add the tutorials to the select widget.
	  var Ids = ["styledSelect_Tool_Capabilities", "styledSelect_Scenarios"];

	  //loop over all the tutorials in the list
	  for (var j = 0; j < tutorials.length; j++)
      {
		  //for each tutorial add an option to a proper select.
		  //So iterate over the given selects
    	  for (var i=0; i<Ids.length; i++)
    	  {
    		  //alert(Ids[i]);
    		  var selectBox = document.getElementById(Ids[i]);
    		  if (selectBox)
    		  {
    			  //validate that the select is the right one for the category
    			  var catNameToken = tutorials[j].categoryName.replace(" ", "_");
    			  if (Ids[i].indexOf(catNameToken) > -1)
    			  {
    				  //if it is the right category add it to the option of the select
    				  //alert("Name: " + tutorials[j].name + ", value:  " + j)
    				  //use iterator j as a tutorial identifier as it will be used later to locate a tutorial in the list
    				  if (selectedTutorialName && tutorials[j].name == selectedTutorialName)
    					  selectBox.options[selectBox.options.length] =new Option(tutorials[j].name, j, false, true);
    				  else
    					  selectBox.options[selectBox.options.length] =new Option(tutorials[j].name, j);
    			  }
    		  }
    		  
	      }
	  }
};