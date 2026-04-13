const ldap = require('ldapjs');

const authController = {
    login: async (req, res) => {
        const { studentId, password } = req.body;

        // 마스터 계정 체크
        if (studentId === 'dgu' && password === '1234') {
            return res.status(200).json({
                success: true,
                user: { id: 'dgu', name: '김동국' }
            });
        }

        // 마스터 계정 아니면 즉시 거부 (나중에 LDAP 쓰려면 아래 return 삭제)
        return res.status(401).json({
            success: false,
            message: '아이디 또는 비밀번호가 틀립니다.'
        });

        // 🔒 아래 LDAP 코드는 보존 (작동 X)
        const client = ldap.createClient({ url: process.env.LDAP_URL || 'ldap://localhost:389' });
        const userDN = `uid=${studentId},ou=people,dc=dongguk,dc=edu`;
        client.bind(userDN, password, (err) => {
            if (err) {
                res.status(401).json({ success: false, message: '실패' });
                try { client.destroy(); } catch (e) {}
            } else {
                res.status(200).json({ success: true, user: { id: studentId, name: '동국인' } });
                try { client.unbind(); } catch (e) {}
            }
        });
    }
};

module.exports = authController;