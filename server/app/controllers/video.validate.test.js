const video_validate = require("./video.validate")
// @ponicode
describe("video_validate.uplaodVideo", () => {
    test("0", () => {
        let callFunction = () => {
            video_validate.uplaodVideo({ title: "Future Interactions Representative", category: "foo bar", description: "Description: ", rating: false, genere: "Edmond", film_name: "4.0.0-beta1\t" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            video_validate.uplaodVideo({ title: "Dynamic Quality Specialist", category: 0, description: " description ", rating: "https://croplands.org/app/a/confirm?t=", genere: false, film_name: "v1.2.4" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            video_validate.uplaodVideo({ title: -Infinity, category: -Infinity, description: -Infinity, rating: -Infinity, genere: -Infinity, film_name: -Infinity })
        }
    
        expect(callFunction).not.toThrow()
    })
})
