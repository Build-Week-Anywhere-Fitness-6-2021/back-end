const db = require("../../data/db-config")

module.exports = {
  add,
  count,
  countSpecific 
  //! do we think it is possible to get the **specific** classes_id to show how many people are registered
}

async function count( column ){
   return await db( 'classes_participants' ).count( column )
 }
 
 // I HAVE NO IDEA IF THIS IS GONNA WORK
 async function countSpecific( column, id ){
   return await db('classes_participants').count( column ).where( 'classes_id', id === 5 )
 }
 

 async function add( participant ) {
   const [ newPartObj ] = await db("classes_participants").insert(
      {
         participant: participant.classes_participant
      }, [
            'participant'
         ]
    );
   return newPartObj
 }