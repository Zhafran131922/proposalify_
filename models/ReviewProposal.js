const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewProposalSchema = new Schema({
    proposal: { type: Schema.Types.ObjectId, ref: 'Proposal', required: true },
    komentar: { type: String, required: true }
});

module.exports = mongoose.model('ReviewProposal', ReviewProposalSchema);
