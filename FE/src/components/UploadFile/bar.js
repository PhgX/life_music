// const storage = firebase.storage ( ) ;
// const FileUploader = document.querySelector ( ' input [ type = " file " ] ' ) ;
// const progressBar = document.querySelector ( ' . progressBar ' ) ;
// const imageOutput = document.querySelector ( ' img ' ) ;
// // add eventListener to the file uploader
// FileUploader.addEventListener ( ' change ' , ( e ) ⇒ {
//       const selected File = e.target.files [ 0 ] ;
//       // Pick your prefered storage folder on firebase storage
//       const storageReference storage.ref ( ' myGallery / ' + selectedFile.name ) ;
//       // upload the file
//       const getProgress = storageReference.put ( selectedFile ) ;
//       // get the upload progress and handle any pending errors
//       getProgress.on (
//             firebase.storage . TaskEvent.STATE_CHANGED ,
//             function ( snapshot ) {
//                    // get number of bytes uploaded and number of bytes to be uploaded
//                   let progress = ( snapshot.bytes Transferred / snapshot.totalBytes ) * 100 ;

// } ) ;
        
//                          // update the progress bar as the upload progresses
//                          progressBar.style.width = $ { progress } % " ;
//                          // handle a pause or cancel event
//                          switch ( snapshot.state ) {
//                 } , // Har
//                                  case firebase.storage . TaskState . PAUSED :
//                                           console.log ( ' Upload Has Been Paused ' )
//                                           break ;
//                                  case firebase.storage . TaskState . RUNNING :
//                                           console.log ( ' Upload Task Running ' ) ;
//                                           break ;

// 		} ) ;
//               } , // Handle errors
//               function ( error ) {
//                      switch ( error.code ) {
//                             // user doesnt have rights
//                             case ' storage / unauthorized ' :
//                                    console.log ( ' User Has No permission ' ) ;
//                                    break ;
//                             // upload was cancelled
//                             case ' storage / canceled " :
//                                    console.log ( ' Upload Was Cancelled ' ) ;
//                                    break ;
//                             // Network errors and any other error
//                             case ' storage / unknown ' :
//                                    console.log ( error ) ;
//                                    break ;
//                      }
//               } , I / Handle Upload Success