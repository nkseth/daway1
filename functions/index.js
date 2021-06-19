const functions = require("firebase-functions");
const admin = require("firebase-admin");




admin.initializeApp();

const addid = (cu, itemid, data) => {

    const ref = admin.firestore().collection('/companies/' + cu + '/postedjobs').doc(itemid)
    const dd = admin.firestore().collection('jobpostedbycategory').doc(itemid)
    ref.update({ id: itemid });
    dd.set({ ...data, id: itemid })


}

const addactivestatusofcompany = (cu, itemid, data) => {

    const ref = admin.firestore().collection('/companies/' + cu).add({ activestatus: false })



}
// post job
exports.postjobid = functions.firestore.document('/companies/{cuuid}/postedjobs/{itemId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data()
        const cu = context.params.cuuid
        const itemid = context.params.itemId

        return addid(cu, itemid, data)
    })






exports.companycreate = functions.firestore.document('/companies/{cuuid}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data()
        const cu = context.params.cuuid
        const itemid = context.params.itemId


        return addactivestatusofcompany(cu, itemid, data)
    })

exports.createUsertype = functions.https.onCall((data, context) => {
    console.log('this is email' + data.eil)
    return admin.auth().getUserByEmail(data.eil).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            usertype: data.type === 'company' ? 'company' : 'student'
        })
    }).then(() => {
        return {
            message: 'success'
        }
    }).catch(error => {
        return error
    })



})

const deljobbycat = (idd) => {

    const ref = admin.firestore().collection('jobpostedbycategory').doc(idd).delete()



}

exports.jobdelete = functions.firestore.document('/companies/{cuuid}/postedjobs/{jobid}')
    .onDelete(async (snapshot, context) => {
        const data = snapshot.data()



        return deljobbycat(data.id)
    })



const userappliedfun = (daa) => {


    const getuserresume = admin.firestore().collection('user/' + daa.applieduser + "/userresume").doc("resume")
    getuserresume.get().then(dai => {

        console.log(dai)
        const userresume = dai.data()
        const ref = admin.firestore().collection("companies/" + daa.companyid + "/applieduser")
        ref.add({ ...daa, userresume }).then(() => {
            const ref1 = admin.firestore().collection("companies/" + daa.companyid + "/notification")
            ref1.add({ message: userresume.displayname, type: 'applied', date: Date.now(), for: daa.title, category: daa.category })
            console.log('done')
        })
    })




}

const userappliedfunupdate = (daa) => {


    const getuserresume = admin.firestore().collection('user/' + daa.applieduser + "/appliedjobs").doc(daa.id)
    getuserresume.update({ status: daa.status }).then(() => {
        console.log("done update")

    })




}

exports.userapplied = functions.firestore.document('/user/{cuuid}/appliedjobs/{applied}')
    .onCreate(async (snapshot, context) => {
        const dataa = snapshot.data()

        console.log(snapshot.data())

        return userappliedfun(dataa)
    })


exports.userappliedupdate = functions.firestore.document('/companies/{cuuid}/applieduser/{applied}')
    .onUpdate(async (change, context) => {
        const dataa = change.after.data()


        return userappliedfunupdate(dataa)
    })


exports.internshipdetailsupdate = functions.firestore.document('/companies/{cuuid}/postedjobs/{postedjobs}')
    .onUpdate(async (change, context) => {
        const dataa = change.after.data()


        return internshipdetailsupdatefun(dataa)
    })

const internshipdetailsupdatefun = (daa) => {


    const getuserresume = admin.firestore().collection("/jobpostedbycategory").doc(daa.id)
    getuserresume.update(daa).then(() => {
        console.log("done update")

    })
}


//this when feedback is given by the company
exports.userfinished = functions.firestore.document('companies/{cuuid}/finishedintership/{applied}')
    .onCreate(async (snapshot, context) => {
        const dataa = snapshot.data()

        console.log(snapshot.data())

        return userfinishedfun(dataa)
    })
//   finishedtimestamp: admin.database.ServerValue.TIMESTAMP 
const userfinishedfun = (daa) => {
    const getuserresume = admin.firestore().collection('user/' + daa.internshipdata.applieduser + "/finishedinternship")
    getuserresume.add(daa).then(() => {

        console.log("done edit")
    })
}





