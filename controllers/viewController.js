
/*
exports.lol = (req, res) => {
    res.status(200).render('base', {
        title: '/'
      });
    };
    */
exports.getOverview = (req, res) => {
        res.status(200).render('overview', {
          title: 'homepage'
        }
        );
      };

exports.getLoginForm = (req, res) => {
        res.status(200).render('login', {
          title: 'login'
        });
      }