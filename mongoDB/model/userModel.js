import mongoose from "mongoose";

// 사용자 정보를 위한 Mongoose 스키마를 정의합니다.
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
});

// 정의된 스키마를 사용하여 'users'라는 이름의 Mongoose 모델을 생성하고 내보냅니다.
// 이 모델은 MongoDB의 'users' 컬렉션과 연결됩니다.

export default mongoose.model("users", userSchema);

// 이 코드는 MongoDB에서 사용할 사용자 데이터 모델을 정의합니다. Mongoose를 사용하여 스키마를 만들고, 이를 바탕으로 모델을 생성합니다. 이 모델을 통해 데이터베이스와 상호작용할 수 있으며, CRUD 작업을 수행할 수 있습니다.
