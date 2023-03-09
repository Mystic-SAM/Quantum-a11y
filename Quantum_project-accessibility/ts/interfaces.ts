export interface fetchdataType{
    class_heading: string,
    cetegory: string,
    grad: string,
    details?: {
        number_of_unit: number,
        number_of_lession: number,
        number_of_topics: number
    } ,
    student?: number,
    isStarred?: boolean,
    img:string,
    // is_visiable: boolean,
    isExpire?: boolean,
    options: string[],
    action?:{
                disablePreview?:boolean,
        disableCourseManager?: boolean,
                disableReport?: boolean,
                disableSubmission?:boolean
    },
    course_duration?:{
                starting_date:string,
                ending_date: string
            },
               
}