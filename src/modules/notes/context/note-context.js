import React from "react";
export const NoteContext = React.createContext({ 
    notes: [],
    total: 0,
    getNotes:function(){},
    addSingleNote : function(note){
    },
    // added ***************
    markCount:0,
    isMarked:false,
    isMarking:function(){},
    deleteRecords:function(){},
    filteredRecord:function(){},
    setCurrNote:function(){},
    });
