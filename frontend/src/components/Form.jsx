function Form() {
    return (
        <div className="form-container">
            <h1>Please fill all the required fields</h1>
            <form>
                <label>Name </label> <input type="text" />
                <label>Email </label> <input type="email" />
                <label>Phone </label> <input type="tel" />
                <label>Title </label> <input type="Text" />
                <label>Description </label> <textarea></textarea>
                <input type="file" />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Form;