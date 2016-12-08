const qList = [
    "你未来的目标是什么？", 
    "实现这些目标有什么痛点？（行业痛点、公司发展痛点、客户痛点）",
    "你所看到的，这个行业跟过去有什么不一样了？",
    "这个行业最关键的岗位是什么？",
    "这个岗位跟过去有什么变化？",
    "未来可能是什么将这个行业颠覆？"
]
const emptyLen = 0
const firstElem = 0
const stepSize = 1
const checkQuestion = (data, question = []) => {
    const quelen = question.length, qlen = qList.length
    if (question[quelen - 1]) {
        return false
    }
    if (quelen === emptyLen) {
        question.push(null)
        return qList[quelen]    
    }
    question[qlen - 1] = data.Content[firstElem]
    if (quelen === qlen) {
        return "问题回答完毕"
    }
    question[quelen] = null
    return qList[quelen]
}